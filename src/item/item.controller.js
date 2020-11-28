const { check, validationResult } = require('express-validator');
const itemModel = require('./item.model');

let itemController = {};

itemController.create = async (req, res) => {

  await check('name', 'Name cannot be blank').isLength({ min: 1 }).run(req);
  await check('rent_price', 'Rent Price cannot be blank').isLength({ min: 1 }).run(req);
  await check('cost_price', 'Cost Price cannot be blank').isLength({ min: 1 }).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(202).send({
      error: errors.array(),
      code: 404
    });
    return;
  }

  try {
    const itemDoc = new itemModel(req.body);
    await itemDoc.save();
    res.status(202).send({
      data: itemDoc,
      message: 'Successfully Created!',
      code: 202
    });
  } catch (error) {
    res.status(500).send({
      error: error,
      code: 500
    });
  }

};

itemController.update = async (req, res) => {

  await check('name', 'Name cannot be blank').isLength({ min: 1 }).run(req);
  await check('rent_price', 'Rent Price cannot be blank').isLength({ min: 1 }).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(202).send({
      error: errors.array(),
      code: 404
    });
    return;
  }

  try {

    const update = {
      name: req.body.name,
      rent_price: req.body.rent_price
    };

    const itemData = await itemModel.findOneAndUpdate({ _id: req.body._id }, { $set: update },
      {
        'fields': { _id: 0, name: 1, rent_price: 1, cost_price: 1 },
        new: true
      });
    if (itemData) {
      res.status(202).send({
        data: itemData,
        message: 'Successfully Updated!',
        code: 202
      });
    } else {
      res.status(404).send({
        message: 'Item does not exist.',
        code: 404
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error,
      code: 500
    });
  }

};

itemController.delete = async (req, res) => {
  try {
    const itemData = await itemModel.findOneAndDelete({ _id: req.body._id });
    if (itemData) {
      res.status(202).send({
        data: itemData,
        message: 'Item has been deleted.',
        code: 202
      });
    } else {
      res.status(404).send({
        message: 'Item does not exist.',
        code: 404
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error,
      code: 500
    });
  }
};

module.exports = itemController;
