import model from './abstracts/Model.js';

const User = model({
    tableName: "users",
});

export default User;