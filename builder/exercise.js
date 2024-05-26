class Code {
  constructor(className) {
    this.className = className;
    this.properties = [];
  }

  static get indent() {
    return 2;
  }

  toStringImpl() {
    let text = `class ${this.className} {\n`;

    if (!this.properties.length) {
      text += `}`;
      return text;
    }

    const propertiesName = this.properties.join(", ");

    text += `${" ".repeat(Code.indent)}constructor(${propertiesName}) {\n`;

    this.properties.forEach((property) => {
      text += `${" ".repeat(
        Code.indent + 1
      )} this.${property} = ${property};\n`;
    });

    text += `${" ".repeat(Code.indent)}}\n`;
    text += `}`;

    return text;
  }

  toString() {
    return this.toStringImpl();
  }
}

class CodeBuilder {
  constructor(className) {
    this.code = new Code(className);
  }

  addField(name) {
    this.code.properties.push(name);

    return this;
  }

  toString() {
    return this.code.toString();
  }
}

const cb = new CodeBuilder("Person");
cb.addField('name').addField('age');

console.log(cb.toString());
