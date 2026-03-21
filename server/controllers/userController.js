import prisma from "../config/prisma.js";

export const getProfile = async (req, res) => {

  try {

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    res.json(user);

  } catch (err) {

    res.status(500).json({ error: "Failed to fetch profile" });

  }

};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Validate if data exists
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, email },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    res.json(user);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: "Email is already in use" });
    }
    res.status(500).json({ error: "Failed to update profile" });
  }
};