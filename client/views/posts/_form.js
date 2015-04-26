/* Update name for refactor in this client/template/views/post dir */
Template.posts_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Posts, field);
    },
});