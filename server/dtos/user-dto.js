module.exports = class UserDto {
    email;
    id;
    name;

    constructor(model) {
        this.email = model.email;
        this.id = model.uid;
        this.name = model.name;
    }
}
