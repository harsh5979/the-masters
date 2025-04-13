const TeamSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }, // Event reference
    teamName: { type: String, required: true },
    leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Team leader (Student)
    members: [
        {
            student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            enrollmentNumber: { type: String, required: true }
        }
    ],
}, { timestamps: true });

// Ensure a student joins only one team per event
TeamSchema.index({ event: 1, "members.student": 1 }, { unique: true });

module.exports = mongoose.model('Team', TeamSchema);
