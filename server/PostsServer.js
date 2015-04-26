Meteor.publishComposite('posts', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Posts with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Posts.find(doc, sort);
        },
        /* Return a list of categories
        find: function() {
            return Categories.find(doc, sort);
        }, */
        children: [
            /* return all related Images */
            /*We can comment this out when we don't need it*/
            {
                find: function(collection) {
                    return Images.find({_id: collection.imageId});
                }
            },
            /* return all related Line Items */
            /*{
                find: function(collection) {
                    return LineItem.find({_id: collection.lineItemId});
                }
            },*/
            /* return all related Users */
            {
                find: function(collection) {
                    return Meteor.users.find({
                        $or: [
                            {_id: collection.createdUserId},
                            {_id: collection.updatedUserId},
                        ]
                    });
                }
            },
        ],
    }
});

/* Looks like I'm going to have to update the below code for Categories */

Meteor.methods({
    "Posts.insert": function(doc) {
        var _id = Posts.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
var query = Posts.find({});
var handle = query.observe({
    removed: function(model) {
        //removing related image, when post removed
        Images.remove(model.imageId);
    }
});