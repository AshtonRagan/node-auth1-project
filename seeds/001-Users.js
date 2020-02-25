exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("Users").insert([
        { userName: "Ark", passWord: "JustNo" },
        { userName: "jerry", passWord: "hello" },
        { userName: "rick", passWord: "burp" }
      ]);
    });
};
