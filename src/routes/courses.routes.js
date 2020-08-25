const coursesController = require("../controllers/courses.controller");
const Joi = require("@hapi/joi");

module.exports = server => {
  const coursesRoutes = [
    // listas todos os cursos
    {
      method: "GET",
      path: "/courses",
      options: {
        description: "Rota de cursos",
        notes: "Buscar todos os cursos da aplicação",
        tags: ["api"], // ADD THIS TAG
        validate: {
          failAction: (req, res, error) => {
            throw error;
          },
          query: Joi.object({
            page: Joi.number(),
            limit: Joi.number(),
          }),
        },
        handler: coursesController.get,
      },
    },
    // litar curso por id
    {
      method: "GET",
      path: "/courses/{id}",
      options: {
        description: "Rota de cursos",
        notes: "Buscar todos os cursos da aplicação",
        tags: ["api"], // ADD THIS TAG
        validate: {
          failAction: (req, res, error) => {
            throw error;
          },
          params: Joi.object({
            id: Joi.string(),
          }),
        },
        handler: coursesController.getById,
      },
    },
    // criar curso
    {
      method: "POST",
      path: "/courses",
      options: {
        description: "Rota criação de cursos",
        notes: "Criar curso",
        tags: ["api"], // ADD THIS TAG
        validate: {
          failAction: (req, res, error) => {
            throw error;
          },
          payload: Joi.object({
            idCategory: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
          }),
        },
        handler: coursesController.create,
      },
    },
    // alterar curso
    {
      method: "PUT",
      path: "/courses/{id}",
      options: {
        description: "Rota alteracao de cursos",
        notes: "Alterar curso",
        tags: ["api"], // ADD THIS TAG
        validate: {
          failAction: (req, res, error) => {
            throw error;
          },
          params: Joi.object({
            id: Joi.string().required(),
          }),
          payload: Joi.object({
            idCategory: {
              _id: Joi.string(),
            },
            name: Joi.string(),
            description: Joi.string(),
          }),
        },
        handler: coursesController.put,
      },
    },
    // remover curso
    {
      method: "DELETE",
      path: "/courses/{id}",
      options: {
        description: "Rota remoção de curso",
        notes: "Remover curso",
        tags: ["api"], // ADD THIS TAG
        validate: {
          failAction: (req, res, error) => {
            throw error;
          },
          params: Joi.object({
            id: Joi.string().required(),
          }),
        },
        handler: coursesController.delete,
      },
    },
  ];

  server.route(coursesRoutes);
};
