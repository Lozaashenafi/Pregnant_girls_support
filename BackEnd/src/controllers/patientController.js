const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const registerPregnantWoman = async (req, res) => {
  const { name, email, phoneNumber, dueDate, doctorId, password } = req.body;

  if (!name || !email || !phoneNumber || !doctorId || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the doctor exists
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    // Check if the user with the given email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Check if the existing user is a patient
      const existingPregnantWoman = await prisma.patient.findUnique({
        where: { userId: existingUser.id },
      });

      if (existingPregnantWoman) {
        return res.status(400).json({ message: "Email already registered." });
      }
    }

    // Hash the password before creating the user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPregnantWoman = await prisma.patient.create({
      data: {
        User: {
          create: {
            name,
            email,
            phoneNumber,
            role: "Patient",
            password: hashedPassword, // Store the hashed password
          },
        },
        Doctor: {
          connect: { id: doctorId }, // Correct way to associate with a doctor
        },
        doctorAccepted: false,
      },
    });

    // Send a notification to the doctor about the new patient request
    await prisma.notification.create({
      data: {
        doctorId: doctorId,
        message: `New pregnant woman request from ${name}. Please review the request.`,
        status: "Pending",
      },
    });

    return res.status(201).json({
      message: "Pregnant woman registered successfully, doctor notified.",
      patient: newPregnantWoman,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const calculatePregnancyDuration = (pregnancyDate) => {
  const currentDate = new Date();
  const startDate = new Date(pregnancyDate);

  const differenceInMilliseconds = currentDate - startDate;
  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);

  return {
    weeks: weeks,
    days: days % 7,
  };
};

const getPatientById = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await prisma.patient.findUnique({
      where: { id: parseInt(id) },
      include: { User: true },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    const pregnancyDuration = calculatePregnancyDuration(patient.pregnancyDate);

    return res.status(200).json({
      patient: {
        id: patient.id,
        name: patient.User.name,
        pregnancyDate: patient.pregnancyDate,
        pregnancyDuration,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  registerPregnantWoman,
  getPatientById,
};
