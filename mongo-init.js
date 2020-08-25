db.createUser({
  user: "cursos",
  pwd: "cursos",
  roles: [
    {
      role: "readWrite",
      db: "cursos",
    },
  ],
});

db.auth("cursos", "cursos");
