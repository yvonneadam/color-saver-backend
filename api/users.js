import connectToMongoDb from "./_database/connect-to-mongodb";
import User from "./_database/models/User";

const handler = async (request, response) => {
  try {
    await connectToMongoDb();

    if (request.method === "POST") {
      const users = await User.find({});
      return response.json(users);
    } else if (request.method === "POST") {
      const user = new User({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
      });
      const newUser = await user.save();
      return response.json(newUser);
    } else {
      throw new Error("Route not supported");
    }
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};
export default handler;
