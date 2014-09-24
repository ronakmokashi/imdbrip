if (Meteor.isClient) {

//sorting movies in ascending order for now
    Template.collections.helpers({
        movie: function() {
            return Movies.find({},{sort :{"rating":-1}});
        }
    });

    Template.collections.events({
        'click #collection_thumb':function(e) {
            console.log("id:" + this._id);
        }
    });

    Template.likemovie.helpers({
        movielike: function(){
            var count = Movies.find().count();
            var random1 = Math.floor(Math.random()*count+1);
            var movie1  = Movies.find({serial:random1}).fetch();

            var random2 = Math.floor(Math.random()*count+1);
            var movie2  = Movies.find({serial:random2}).fetch();

            var movies = {
                movie1: {"name": movie1[0].movie_name, "id": movie1[0]._id, "thumb": movie1[0].thumbnail},
                movie2: {"name": movie2[0].movie_name, "id": movie2[0]._id, "thumb": movie2[0].thumbnail}
            }

            console.log("Movie:"+JSON.stringify(movies));
            return movies;
        }

    });

    Template.likemovie.events({
        'click .thumb_glph_left': function(e){
            console.log(e.currentTarget.id)
            Movies.update({_id: e.currentTarget.id},{$inc:{rating:1}});
        },

        'click .thumb_glph_right': function(e){
            console.log(e.currentTarget.id)
            Movies.update({_id: e.currentTarget.id},{$inc:{rating:1}});
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

            Movies.insert({"date":mv_date,rating:0,"thumbnail":mv_thumb,"movie_name":mv_title,"description":mv_desc,"serial": serial});


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

