if (Meteor.isClient) {

Template.modal.rendered = function(){
    $('#myModal').modal('show');
};


//sorting movies in ascending order for now
    Template.collections.helpers({
        movie: function() {
            return Movies.find({},{sort :{"rating":-1}});
        }
    });

    Template.collections.events({

        'click #collection_thumb':function(e) {
            console.log("id:" + this._id);
        },
        'click #fb':function(e) {

            return Meteor.loginWithFacebook({
                requestPermissions: ["email", "user_location", "user_interests", "user_friends", "user_about_me", "user_online_presence", "friends_location", "publish_actions"],
                requestOfflineToken: true
            });
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

            return movies;
        }

    });

    Template.likemovie.events({

        'click .thumb_glph_left': function(e){
            Movies.update({_id: e.currentTarget.id},{$inc:{rating:1}});
            $(".thumb_img_right").trigger('click');
            Movies.update({_id: e.currentTarget.id},{$inc:{Hit:1}});
        },


        'click .thumb_img_left': function(e){
            Movies.update({_id: e.currentTarget.id},{$inc:{Flop:1}});
        },


        'click .thumb_glph_right': function(e){
            Movies.update({_id: e.currentTarget.id},{$inc:{rating:1}});
            $(".thumb_img_left").trigger('click');
            Movies.update({_id: e.currentTarget.id},{$inc:{Hit:1}});
        },


        'click .thumb_img_right': function(e){
            Movies.update({_id: e.currentTarget.id},{$inc:{Flop:1}});
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


        if (Movies.find().count() == 0){
            Movies.insert({"date":"18 July 2008",Flop:0,Hit:0,rating:0,"thumbnail":"http://spinoff.comicbookresources.com/wp-content/uploads/2012/05/dark-knight-rises-poster.jpg","movie_name":"The Dark Knight","description":"When Batman, Gordon and Harvey Dent launch an assault on the mob, they let the clown out of the box, the Joker, bent on turning Gotham on itself and bringing any heroes down to his level.","serial": 1});
            Movies.insert({"date":"29 July 2011",Flop:0,Hit:0,rating:0,"thumbnail":"http://la-screenwriter.com/wp-content/uploads/2012/04/crazy-stupid-love-poster-d789f.jpg","movie_name":"Crazy, Stupid, Love.","description":"A middle-aged husband's life changes dramatically when his wife asks him for a divorce. He seeks to rediscover his manhood with the help of a newfound friend, Jacob, learning to pick up girls at bars.","serial": 2});
            Movies.insert({"date":" 20 June 2008",Flop:0,Hit:0,rating:0,"thumbnail":"http://www.impawards.com/2008/posters/get_smart.jpg","movie_name":"Get Smart","description":"A highly intellectual but socially awkward spy is tasked with preventing a terrorist attack from a Russian spy agency.","serial": 3});
            Movies.insert({Hit:0,Flop:0, "date" : "(2011– )","description" : "On the run from a drug deal gone bad, Mike Ross, a brilliant college-dropout, finds himself a job working with Harvey Specter, one of New York City's best lawyers.","movie_name" : "Suits","rating" : 0,"serial" : 4,"thumbnail" : "http://www.impawards.com/tv/posters/suits_ver2.jpg"});
            Movies.insert({"date" : "(2004–2012)",
                "description" : "Secrets and truths unfold through the lives of female friends in one suburban neighborhood, after the mysterious suicide of a neighbor.",
                "movie_name" : "Desperate Housewives",
                "rating" : 0,
                "serial" : 5,
                Hit:0,Flop:0,
                "thumbnail" : "https://cdn3.cdnme.se/cdn/6-1/840993/images/2012/desperate-housewives-season-8-poster_205623886.jpg"

            });






        }




    }
});

