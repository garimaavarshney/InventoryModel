const { check, validationResult } = require('express-validator');
const userModel = require('./user.model');

let userController = {};

userController.create = async (req, res) => {

  await check('fName', 'First Name cannot be blank').isLength({ min: 1 }).run(req);
  await check('lName', 'Last Name cannot be blank').isLength({ min: 1 }).run(req);
  await check('email', 'Email cannot be blank').isLength({ min: 1 }).run(req);
  await check('email', 'Email is not valid').isEmail().run(req);
  await check('dob', 'DOB cannot be blank').isLength({ min: 1 }).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(202).send({
      error: errors.array(),
      code: 404
    });
    return;
  }

  try {
    const userDoc = new userModel(req.body);
    await userDoc.save();
    res.status(202).send({
      data: userDoc,
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

userController.update = async (req, res) => {

  await check('fName', 'First Name cannot be blank').isLength({ min: 1 }).run(req);
  await check('lName', 'Last Name cannot be blank').isLength({ min: 1 }).run(req);
  await check('email', 'Email cannot be blank').isLength({ min: 1 }).run(req);
  await check('email', 'Email is not valid').isEmail().run(req);
  await check('dob', 'DOB cannot be blank').isLength({ min: 1 }).run(req);

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
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      dob: new Date(req.body.dob)
    };

    const userData = await userModel.findOneAndUpdate({ email: req.body.email }, { $set: update },
      {
        'fields': { _id: 0, fName: 1, lName: 1, dob: 1, email: 1 },
        new: true
      });
    if (userData) {
      res.status(202).send({
        data: userData,
        message: 'Successfully Updated!',
        code: 202
      });
    } else {
      res.status(404).send({
        message: 'User does not exist.',
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

userController.delete = async (req, res) => {
  try {
    const userData = await userModel.findOneAndDelete({ email: req.body.email });
    if (userData) {
      res.status(202).send({
        data: userData,
        message: 'User profile has been deleted.',
        code: 202
      });
    } else {
      res.status(404).send({
        message: 'User does not exist.',
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

module.exports = userController;
