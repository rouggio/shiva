module.exports = mongoose => {

  var Schema = mongoose.Schema;

  var ScheduleSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } }
  },
    {
      timestamps: true
    }
  );

  return mongoose.model("schedule", ScheduleSchema);
}
