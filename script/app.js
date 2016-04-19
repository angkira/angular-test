/* Controllers */
var Sum = function(items){
    var s = 0;
    items.forEach(function(item){
        s+=item.val;
    });
    return s;
    };
var byPage = function(){
    return function(items, pageNum, pageLength){
        var filtered = [];
        for(var i = (pageNum - 1)*pageLength; i < pageNum*pageLength; i++){
            if(items[i]){
                filtered.push(items[i]);
            }
        }
        return filtered
    }
};
var NotesList = function($scope){
    var model = {
        countPages: function(){
            this.pages = [];
            for(var i = 0; i < this.notes.length; i++){
                if (!(i%this.pageLength)){
                    this.pages.push(this.pages.length+1);
                }
            }
        },
        GetNotes: function(n){
            for (var i = 0; i < n; i++) {
                this.notes.push({
                    'id': i+1,
                    'val': (n-i)*100,
                    'comment': 'Some comment'
                })
            }},
        EditNote:function(Note){
            this.notes[Note.id-1] = angular.copy(Note);
            this.sum = Sum(this.notes);
            this.countPages();
        },
        submit: function(){
            this.EditNote(this.currentNote);
            this.editing=false;
            this.currentNote={};
        },
        cancel: function(){
            this.editing=false;
            this.currentNote={};
        },
        NewNote: function(Nid){
            this.editing = true;
            if(!Nid){
                this.currentNote.id = model.notes.length+1;
            }
                else {this.currentNote.id = Nid};
            },
        notes: [],
        editing: false,
        currentNote: {},
        pageNum: 1,
        pageLength: 10,
        pages:[],
    }
    model.GetNotes(10);
    model.countPages(),
    model.sum = Sum(model.notes);
    $scope.model = model;


}

/*Directives*/

var MyTable = function(){
    return {
        restrict: 'E',
        templateUrl: 'templates/myTable.html',
        replace: true,
    }
};
var EditForm = function(){
    return {
        restrict: 'E',
        templateUrl: 'templates/EditForm.html',
        replace: true,
    }
}
var app = angular.module('app', []);
/*app*/
app.controller('NotesList', NotesList);
app.directive('myTable', MyTable);
app.directive('editForm', EditForm);
app.filter('byPage', byPage);