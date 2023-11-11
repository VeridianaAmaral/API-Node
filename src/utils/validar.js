const validar = (objeto) => {
    let errors = [];
    for (const key in objeto) {
      if (objeto.hasOwnProperty(key)) {
        if (
          objeto[key] === null ||
          objeto[key] === undefined ||
          objeto[key] === ""
        ) {
          errors.push(`${key} esta incorreto`);
        }
      }
      if (errors.length > 0) {
        throw new Error(errors);
      }
    }
  };

  export default validar;
  