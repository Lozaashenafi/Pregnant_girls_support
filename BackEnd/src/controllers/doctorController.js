const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Register a doctor
const registerDoctor = async (req, res) => {
  const {
    name, // Accept name as a single field instead of first and last names
    email,
    password,
    phoneNumber,
    specialty,
    availability,
    hospitalName,
  } = req.body;

  // Check if required fields are provided
  if (
    !name ||
    !email ||
    !password ||
    !phoneNumber ||
    !specialty ||
    !availability ||
    !hospitalName
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user (for login credentials)
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name, // Use name field for full name
        phoneNumber,
        role: "Doctor", // Assuming the user is a doctor
      },
    });

    // Create the doctor record
    const newDoctor = await prisma.doctor.create({
      data: {
        userId: newUser.id,
        specialty,
        availability,
        hospitalName,
      },
    });

    return res.status(201).json({
      message: "Doctor registered successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// Endpoint to accept or decline the pregnant woman's request
const respondToPregnantWoman = async (req, res) => {
  const { id } = req.params;
  console.log("Responding to pregnant woman request:", req.params.id, req.body);
  // ID of the pregnant woman request
  const {
    action,
    height,
    weight,
    bloodType,
    medicalHistory,
    allergies,
    currentMedications,
    immunizations,
    dueDate,
    pregnancyDate, // Ensure this is captured
  } = req.body;
  // Validate pregnancyDate (if required)
  if (!pregnancyDate) {
    return res.status(400).json({ message: "Pregnancy date is required." });
  }
  if (!action || !["accept", "decline"].includes(action)) {
    return res
      .status(400)
      .json({ message: "Action must be either 'accept' or 'decline'" });
  }

  try {
    // Find the pregnant woman by ID
    const pregnantWoman = await prisma.patient.findUnique({
      where: { id: parseInt(id) },
      include: { User: true }, // Include the related User for reference
    });

    if (!pregnantWoman) {
      return res.status(404).json({ message: "Pregnant woman not found." });
    }

    // If the doctor accepts the request
    if (action === "accept") {
      // Update the pregnant woman's status and additional data
      const updatedPatient = await prisma.patient.update({
        where: { id: pregnantWoman.id },
        data: {
          doctorAccepted: true, // Accept the request
          height,
          weight,
          bloodType,
          medicalHistory,
          allergies,
          currentMedications,
          immunizations,
          dueDate,
          pregnancyDate,
        },
      });

      // Send a success response
      return res.status(200).json({
        message: "Pregnant woman request accepted, data filled.",
        patient: updatedPatient,
      });
    }

    // If the doctor declines the request
    if (action === "decline") {
      // Update the pregnant woman's status to declined
      await prisma.patient.update({
        where: { id: pregnantWoman.id },
        data: {
          doctorAccepted: false, // Mark as declined
        },
      });

      // Send a success response
      return res.status(200).json({
        message: "Pregnant woman request declined.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getDoctorsList = async (req, res) => {
  try {
    // Fetch the list of doctors from the database, including the doctor name from the User model
    const doctors = await prisma.doctor.findMany({
      include: {
        User: {
          select: {
            name: true, // Include the name from the User model
          },
        },
      },
    });

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found." });
    }

    // Format the doctor data to include the name
    const doctorsWithName = doctors.map((doctor) => ({
      id: doctor.id,
      specialty: doctor.specialty,
      availability: doctor.availability,
      hospitalName: doctor.hospitalName,
      name: doctor.User.name, // Add name from User model
    }));

    // Return the list of doctors with their names
    return res.status(200).json({
      message: "Doctors retrieved successfully",
      doctors: doctorsWithName,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createAppointment = async (req, res) => {
  const { patientId, doctorId, date, status = "Pending" } = req.body;

  // Validate input
  if (!patientId || !doctorId || !date) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Validate if patient exists
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    // Validate if doctor exists
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    // Check doctor's availability (Optional: Customize this logic as needed)
    const doctorAvailability = doctor.availability
      .split(",")
      .map((day) => day.trim());
    const appointmentDate = new Date(date);
    const appointmentDay = appointmentDate.toLocaleString("en-US", {
      weekday: "long",
    });

    if (!doctorAvailability.includes(appointmentDay)) {
      return res
        .status(400)
        .json({ message: `Doctor is not available on ${appointmentDay}.` });
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        date: new Date(date),
        status,
      },
    });

    return res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerDoctor,
  respondToPregnantWoman,
  getDoctorsList,
  createAppointment,
};
