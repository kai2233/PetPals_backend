exports.getAllPets = async (req, res) => {
    const Pets = [{ id: 1, name: "Luna" }, { id: 2, name: "CoCo" }];
    res.json(Pets);
};

exports.petDetail = async (req, res) => {
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

exports.createPet = async (req, res) => {

}

exports.deletePet = async (req, res) => {

}

exports.updatePet = async (req, res) => {

}