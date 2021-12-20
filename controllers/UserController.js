const generatePassword = require("generate-password");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
// Models
const User = require("../models/User");

class UserController {
  async addUser({ name, email }) {
    const password = generatePassword.generate({
      length: 7,
      numbers: true,
      uppercase: true,
    });

    // Check if a user with the same email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return { error: "A user with the same email already exists" };
    }

    // creating a new mongoose doc from user data
    const newUser = new User({ name, email });

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);

    // now we set user password to hashed password
    newUser.password = await bcrypt.hash(password, salt);

    newUser.save();

    if (email) {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "ualikhan521@gmail.com", // generated ethereal user
          pass: "usmana35khan", // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Xplode Tech" <ualikhan521@gmail.com>', // sender address
        to: `${name} : ${email}`, // list of receivers
        subject: "Registation completed ✔", // Subject line
        html: ` <img src='https://scontent.fkhi23-1.fna.fbcdn.net/v/t39.30808-6/p320x320/248649759_668126817901065_55636775377474404_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=e3f864&_nc_eui2=AeG24VUx_Of99jwtMOSinw_ibgAgfZ9lryhuACB9n2WvKChqrs0TagkfkTimiz46tNTgt8GjnmAUFpp-obM08A9j&_nc_ohc=wlzjVRZQxh8AX9-RlRs&_nc_ht=scontent.fkhi23-1.fna&oh=325a06170e42bdc29b5e27c0f5968299&oe=61B28FD4'> <h2 style='text-align: center;'>Welcome To Xplode Tech</h2> <p style='margin-top: 10px;'>Your registation in <b>Xplode Tech</b> has been completed . Your user account created successfully you can login below credentials.</p><br>email : ${email} <br> password : ${password}`, // html body
      });
      console.log("Message sent: %s", info.messageId);
    }
  }
}

module.exports = new UserController();
