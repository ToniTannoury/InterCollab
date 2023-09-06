const mongoose = require('mongoose');
const randomstring = require('randomstring');
const mongoosePaginate = require('mongoose-paginate')
const roomSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  type: {
    type: String,
    enum: ["private", "public", "paid"],
    required: true,
    default: "public"
  },
  description: {
    type: String,
    required: [true, 'Please enter a description for the room']
  },
  maxNumberOfParticipants:{
    type: Number,
    required: [true, 'Please enter the max number of participants']
  },
  currentParticipants: 
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default:[]
    }
  ,
  title: {
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  pinCode: {
    type: String,
    required: true,
    default: () => {
      const random1 = randomstring.generate({ length: 3, charset: 'alphanumeric', capitalization: 'uppercase' });
      const random2 = randomstring.generate({ length: 3, charset: 'alphanumeric' });
      return `${random1}-${random2}`;
    }
  },
  priceToEnter: {
    type: Number,
    required: false,
    default: 0
  },
  isRoomOftheMonth: {
    type: Boolean,
    default: false
  },
  totalParticipants:{
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default:[]
  }
},
{
  timestamps: true
});
roomSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Room", roomSchema);
