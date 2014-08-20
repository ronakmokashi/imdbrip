/**
 * Created by jamshed on 18/8/14.
 */
if (Meteor.isClient) {
  Template.collections.rendered= function(){
    console.log("Template Rendered!");
    var f1 = new LiveValidation('url');
    f1.add( Validate.Presence );

  }

  Template.collections.helpers({
    movie: function() {
      return Movies.find({},{sort :Session.get("customsort")});
    }
  });

  Template.addmovie.events({
    'click #publish': function(e){
      var mv_thumb = document.getElementById('url').value;
      var mv_title = document.getElementById('title').value;
      var mv_date = document.getElementById('date').value;
      var mv_desc = document.getElementById('desc').value;
//      Movies.insert({"date":new Date("2011/12/11"),"thumbnail":"http://ia.media-imdb.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_SX214_AL_.jpg","movie_id": "1", "movie_name": "Gaurdians of Galaxy", "description":"Light years from Earth, 26 years after being abducted, Peter"});
      Movies.insert({"date":mv_date,"thumbnail":mv_thumb,"movie_name":mv_title,"description":mv_desc});
    }
  })





  Template.collections.events({
    'click #send': function(e){
      var rate_var = document.getElementById('ratinginput').value;
      Movies.update({_id:this._id},{$set :{"rating": rate_var}});
    }
  });

  Template.sortmovie.events({
    'click .ascending' :function(e) {
      var srt = {"movie_name":1}
      Session.set("customsort", srt);
    }
  });

  Template.sortmovie.events({
    'click .descending' :function(e) {
      var srt = {"movie_name":-1}
      Session.set("customsort", srt);
    }
  });

  Template.sortmovie.events({
    'click .rate' :function(e) {
      var srt = {"rating":-1}
      Session.set("customsort", srt);
    }
  });

  Template.sortmovie.events({
    'click .releasedate' :function(e) {
      var srt = {"date":-1}
      Session.set("customsort", srt);
    }
  });


}
Movies = new Meteor.Collection("movies");

Meteor.startup(function () {
  if (Meteor.isServer) {
//    Movies.remove({});
    console.log("Meteor started");
//    Movies.insert({"date":new Date("2011/12/11"),"thumbnail":"http://ia.media-imdb.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_SX214_AL_.jpg","movie_id": "1", "movie_name": "Gaurdians of Galaxy", "description":"Light years from Earth, 26 years after being abducted, Peter Quill finds himself the prime target of a manhunt after discovering an orb wanted by Ronan the Accuser."});
//    Movies.insert({"date":new Date("2013/2/12"),"thumbnail":"http://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY317_CR0,0,214,317_AL_.jpg","movie_id": "2", "movie_name": "The Dark Knight", "description":"When Batman, Gordon and Harvey Dent launch an assault on the mob, they let the clown out of the box, the Joker, bent on turning Gotham on itself and bringing any heroes down to his level."});
//    Movies.insert({"date":new Date("2010/7/13"),"thumbnail":"http://ia.media-imdb.com/images/M/MV5BMjEyMjcyNDI4MF5BMl5BanBnXkFtZTcwMDA5Mzg3OA@@._V1_SX214_AL_.jpg","movie_id": "3", "movie_name": "The Godfather",  "description":"The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."});
//    Movies.insert({"date":new Date("2015/6/11"),"thumbnail":"http://ia.media-imdb.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX214_AL_.jpg","movie_id": "4", "movie_name": "Shawshank Redemption",  "description":"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."});
//    Movies.insert({"date":new Date("2011/5/10"),"thumbnail":"http://ia.media-imdb.com/images/M/MV5BMjE0MTk3MjE2Nl5BMl5BanBnXkFtZTcwMjE0ODA0NA@@._V1_SY317_CR12,0,214,317_AL_.jpg","movie_id": "5", "movie_name": "Just Go With It", "description":"On a weekend trip to Hawaii, a plastic surgeon convinces his loyal assistant to pose as his soon-to-be-divorced wife in order to cover up a careless lie he told to his much-younger girlfriend."});
  }
});

