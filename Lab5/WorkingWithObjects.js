const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  };

  const module = {
    id: "M101",
    name: "Intro to MERN",
    description: "Module about setting up the MERN stack",
    course: "CS5610"
  };
  
  export default function WorkingWithObjects(app) {
    app.get("/lab5/assignment", (req, res) => {
      res.json(assignment);
    });
    app.get("/lab5/assignment/title", (req, res) => {
        res.json(assignment.title);
      });
      app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
      });

      // Return the full module object
app.get("/lab5/module", (req, res) => {
    res.json(module);
  });
  
  // Return just the name of the module
  app.get("/lab5/module/name", (req, res) => {
    res.json(module.name);
  });
  
  // Update the name of the module using path param
  app.get("/lab5/module/name/:newName", (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  });
  
  // Update module description
  app.get("/lab5/module/description/:newDesc", (req, res) => {
    module.description = req.params.newDesc;
    res.json(module);
  });
  
    
    
  };
  