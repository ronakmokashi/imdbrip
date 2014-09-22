if (Meteor.isClient) {

//sorting movies in ascending order for now
    Template.collections.helpers({
        movie: function() {
            return Movies.find({},{sort :{"movie_name":1}});
        }
    });

    Template.likemovie.helpers({
        movielike: function(){

//      random movie generator
            var count = Movies.find().count();
            var random = Math.floor(Math.random()*count+1);
            return Movies.findOne({serial: random});
        },

         random_movie_left: function(){
            return Session.get("randomize_left");
         },

        random_movie_right: function(){
            return Session.get("randomize_right");
        },

        change_movie: function(){
            return Session.get("change_movie");
        }

//        random_movie_right: function(){
//            return Session.get("randomize");
//        }
    });

    Template.likemovie.events({
        'click .thumb_img_left':function(e){
            console.log(this);
        },

        'click .thumb_glph_left': function(e){
            var count = Movies.find().count();
            var random = Math.floor(Math.random()*count+1);
            var movie =  Movies.findOne({serial: random});
            Session.set("randomize_left",movie );
            Session.set("change_movie", true);
//            console.log(Movies.findOne({_id: this._id}));
//            console.log(this_id);
            $(".thumb_glph_right").trigger('click');


        },

        'click .thumb_glph_right': function(e){
            var count = Movies.find().count();
            var random = Math.floor(Math.random()*count+1);
            var movie =  Movies.findOne({serial: random});
            Session.set("randomize_right",movie );
            Session.set("change_movie", true);
            $(".thumb_glph_left").trigger('click');

        }
    })


    Template.addmovie.events({
        'keyup #title': function(e) {
            document.getElementById('reflect').innerHTML = e.currentTarget.value;
        },
        'keyup #url': function(e) {
            document.getElementById('t_prev').src = e.currentTarget.value;
        },
        'keyup #date': function(e) {
            document.getElementById('t_date').innerHTML ='<span class="glyphicon glyphicon glyphicon-calendar like_cal"></span> '+ e.currentTarget.value;
        },
        'keyup #desc': function(e) {
            document.getElementById('t_desc').innerHTML ='<span class="glyphicon glyphicon glyphicon-film like_desc"></span> '+ e.currentTarget.value;
        },

        'click #publish': function(e){
            var mv_thumb = document.getElementById('url').value;
            var mv_title = document.getElementById('title').value;
            var mv_date = document.getElementById('date').value;
            var mv_desc = document.getElementById('desc').value;
            var serial = Movies.find().count()+1;
            Movies.insert({"date":mv_date,"thumbnail":mv_thumb,"movie_name":mv_title,"description":mv_desc,"serial": serial});


//        resetting the values on button click
            document.getElementById('url').value="";
            document.getElementById('title').value="";
            document.getElementById('date').value="";
            document.getElementById('desc').value="";

            document.getElementById('reflect').innerHTML ="Blank Poster" ;
            document.getElementById('t_prev').src = "http://i.imgur.com/NUWSXfx.jpg";
            document.getElementById('t_date').innerHTML ='<span class="glyphicon glyphicon glyphicon-calendar like_cal"></span> '+"12-08-2015" ;
            document.getElementById('t_desc').innerHTML = '<span class="glyphicon glyphicon glyphicon-film like_desc"></span> '+"This movie is about a guy wearing a black t-shirt holding a white poster in his hands in a grey room.";
        }
    })

}
Movies = new Meteor.Collection("movies");

Meteor.startup(function () {
    if (Meteor.isServer) {
        console.log("Meteor started");
    }
});

