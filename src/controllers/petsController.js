exports.getAllPets = (req, res) => {
    const Pets = [{ id: 1, name: "Luna" }, { id: 2, name: "CoCo" }];
    res.json(Pets);
};

exports.petDetail = (req, res) => {
    let name = 'Luna'
    res.status(201).json({
        status: true,
        message: `${name} details`,
        data: { 
            name: name,
            type: "cat",
        }
    });
};
