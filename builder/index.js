class Tag {
  #name = "";
  #text = "";
  children = [];

  static get indentSize() {
    return 2;
  }

  constructor(name = "", text = "") {
    this.#name = name;
    this.#text = text;
  }

  toStringImpl(indent) {
    const html = [];
    const tagIndent = " ".repeat(indent * Tag.indentSize);

    if (!this.#name) {
      html.push(`${tagIndent}${this.#text}\n`);
      return html.join("");
    }

    html.push(`${tagIndent}<${this.#name}>\n`);

    if (this.#text.length > 0) {
      const textIndent = " ".repeat(Tag.indentSize * (indent + 1));
      html.push(textIndent);
      html.push(this.#text);
      html.push("\n");
    }

    for (const child of this.children) {
      html.push(child.toStringImpl(indent + 1));
    }

    html.push(`${tagIndent}</${this.#name}>\n`);

    return html.join("");
  }

  toString() {
    return this.toStringImpl(0);
  }

  /*
   * This is a static factory method that creates a new instance of the HtmlBuilder class.
   * @param {string} name
   */
  static create(name) {
    return new HtmlBuilder(name);
  }
}

class HtmlBuilder {
  #root;
  #rootName;

  constructor(rootName) {
    this.#root = new Tag(rootName);
    this.#rootName = rootName;
  }

  // non-fluent
  addChild(childName, childText) {
    const child = new Tag(childName, childText);
    this.#root.children.push(child);
  }

  // fluent
  addChildFluent(childName, childText) {
    const child = new Tag(childName, childText);
    this.#root.children.push(child);

    return this;
  }

  addRawChild(HTML) {
    const child = new Tag("", HTML);
    this.#root.children.push(child);

    return this;
  }

  toString() {
    return this.#root.toString();
  }

  build() {
    return this.#root;
  }

  clear() {
    this.#root = new Tag(this.#rootName);
  }
}

// usage

const builder = new HtmlBuilder("ul");

for (const word of ["hello", "world"]) {
  builder.addChild("li", word);
}

console.log(builder.toString());

builder.clear();

const HTML = builder
  .addChildFluent("li", "hello")
  .addChildFluent("li", "world")
  .addRawChild("<li>goodbye</li>")
  .build()
  .toString();

console.log(HTML);
