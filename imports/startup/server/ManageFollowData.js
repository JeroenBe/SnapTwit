import { FollowData } from '../../api/users/collection'

Meteor.methods({
	followUser: function(toFollow){
		var protagonist = FollowData.findOne({uID: Meteor.userId()})
		var subject = FollowData.findOne({uID: toFollow})

		FollowData.update({_id: subject._id}, {$addToSet: {followers: Meteor.user()._id}})
		FollowData.update({_id: protagonist._id}, {$addToSet: {following: toFollow}})
	},

	unFollowUser: function(toUnfollow){
		var protagonist = FollowData.findOne({uID: Meteor.userId()})
		var subject = FollowData.findOne({uID: toUnfollow})

		FollowData.update({_id: subject._id}, {$pull: {followers: Meteor.user()._id}})
		FollowData.update({_id: protagonist._id}, {$pull : {following: toUnfollow}});
	}
})