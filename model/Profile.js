let mongoose = require('mongoose');
let Schema = mongoose.Schema;

experienceSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date
  },
  current: {
    type: Boolean, 
    default: false
  },
  description: {
    type: String
  }
});

educationSchema = new Schema({
  school: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  field_of_study: {
    type: String
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date
  },
  current: {
    type: Boolean, 
    default: false
  },
  description: {
    type: String
  }
});

socialSchema = new Schema({
  youtube: {
    type: String
  },
  twitter: {
    type: String
  },
  facebook: {
    type: String
  },
  linkedin: {
    type: String
  },
  instagram: {
    type: String
  }
});

profileSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    maxlength: 50
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  github: {
    type: String
  },
  experience: [experienceSchema],
  education: [educationSchema],
  social: socialSchema

}); 



module.exports = mongoose.model('Profile', profileSchema);