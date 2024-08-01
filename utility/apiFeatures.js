<<<<<<< HEAD
class ApiFeatures {
  constructor(query, req_query) {
    this.query = query;
    this.req_query = req_query;
  }
  filter() {
    let filterObj = { ...this.req_query };
    const exclude_fields = ["page", "sort", "limit", "fields"];
    exclude_fields.forEach((el) => delete filterObj[el]);
    // console.log(filterObj, this.req_query);
    this.query = this.query.find(filterObj);
    return this;

    // const filterStr = JSON.stringify(filterObj);
    // filterStr = filterStr.replace(
    //   /\b(gte|gt|lte|lt)\b/g,
    //   (match) => `$${match}`
    // );
  }

  sort() {
    if (this.req_query.sort) {
      const sortBy = this.req_query.sort.split(",").join(" ");
      // console.log(sortBy);
      this.query = this.query.sort(sortBy);
    }
    return this;
  }

  fields() {
    if (this.req_query.fields) {
      const fields = this.req_query.fields.split(",").join(" ");
      console.log(fields);

      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  pagination() {
    const limit = this.req_query.limit;
    const page = this.req_query.page;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;
=======
class ApiFeatures {
  constructor(query, req_query) {
    this.query = query;
    this.req_query = req_query;
  }
  filter() {
    let filterObj = { ...this.req_query };
    const exclude_fields = ["page", "sort", "limit", "fields"];
    exclude_fields.forEach((el) => delete filterObj[el]);
    // console.log(filterObj, this.req_query);
    this.query = this.query.find(filterObj);
    return this;

    // const filterStr = JSON.stringify(filterObj);
    // filterStr = filterStr.replace(
    //   /\b(gte|gt|lte|lt)\b/g,
    //   (match) => `$${match}`
    // );
  }

  sort() {
    if (this.req_query.sort) {
      const sortBy = this.req_query.sort.split(",").join(" ");
      // console.log(sortBy);
      this.query = this.query.sort(sortBy);
    }
    return this;
  }

  fields() {
    if (this.req_query.fields) {
      const fields = this.req_query.fields.split(",").join(" ");
      console.log(fields);

      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  pagination() {
    const limit = this.req_query.limit;
    const page = this.req_query.page;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;
>>>>>>> 0212859 (first commit)
