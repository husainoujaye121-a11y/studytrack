import Session from '../models/session.model.js';

export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id }).sort({ date: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createSession = async (req, res) => {
  try {
    const { course, duration, notes, date } = req.body;
    const session = await Session.create({
      user: req.user.id,
      course,
      duration,
      notes,
      date,
    });
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSession = async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);
    res.json({ message: 'Session deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};