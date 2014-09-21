if (Meteor.isClient) {
    Template.collections.rendered= function(){
        Template.sortmovie.events({
            'rendered .ascending' :function(e) {
                var srt = {"movie_name":1}
                Session.set("customsort", srt);
            }
        });
    }

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
        }
    });

    Template.likemovie.events({
        'click .thumb_glph_left': function(e){
            console.log('click works');
        },

        'click .thumb_glph_right': function(e){
            console.log('click works');
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
            document.getElementById('t_date').innerHTML = e.currentTarget.value;
        },
        'keyup #desc': function(e) {
            document.getElementById('t_desc').innerHTML = e.currentTarget.value;
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
            document.getElementById('t_date').innerHTML ="12-08-2015" ;
            document.getElementById('t_desc').innerHTML = "This movie is about a guy wearing a black t-shirt holding a white poster in his hands in a grey room.";
        }
    })







//sorting movies
//    Template.sortmovie.events({
//        'click .ascending' :function(e) {
//            var srt = {"movie_name":1}
//            Session.set("customsort", srt);
//        }
//    });
//
//    Template.sortmovie.events({
//        'click .descending' :function(e) {
//            var srt = {"movie_name":-1}
//            Session.set("customsort", srt);
//        }
//    });
//
//
//    Template.sortmovie.events({
//        'click .releasedate' :function(e) {
//            var srt = {"date":-1}
//            Session.set("customsort", srt);
//        }
//    });


}
Movies = new Meteor.Collection("movies");

Meteor.startup(function () {
    if (Meteor.isServer) {
        console.log("Meteor started");
    }
});

