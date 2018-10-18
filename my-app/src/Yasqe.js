import React, {Component} from 'react';
import YASQE from 'yasgui-yasqe';
import $ from 'jquery';
import './Yasqe.css';

class Yasqe extends Component {

    componentDidUpdate() {
        this.yasqe.refresh();
    }

    componentDidMount() {
        YASQE.defaults.sparql.showQueryButton = true;
        YASQE.defaults.sparql.endpoint = "http://clinicaltrials.bio2rdf.org/sparql";
        YASQE.defaults.sparql.callbacks.success = function (data) {
            console.log("success", data);
        };

        /**
         * We use most of the default settings for the property and class autocompletion types. This includes:
         * -  the pre/post processing of tokens
         * -  detecting whether we are in a valid autocompletion position
         * -  caching of the suggestion list. These are cached for a period of a month on the client side.
         */

        var getAutocompletionsArrayFromCsv = function (csvString) {
            var completionsArray = [];
            csvString.split("\n").splice(1).forEach(function (url) {//remove first line, as this one contains the projection variable
                completionsArray.push(url.substring(1, url.length - 1));//remove quotes
            });
            return completionsArray;
        }


        var customPropertyCompleter = function (yasqe) {
            //we use several functions from the regular property autocompleter (this way, we don't have to re-define code such as determining whether we are in a valid autocompletion position)
            var returnObj = {
                isValidCompletionPosition: function () {
                    return YASQE.Autocompleters.properties.isValidCompletionPosition(yasqe)
                },
                preProcessToken: function (token) {
                    return YASQE.Autocompleters.properties.preProcessToken(yasqe, token)
                },
                postProcessToken: function (token, suggestedString) {
                    return YASQE.Autocompleters.properties.postProcessToken(yasqe, token, suggestedString)
                }
            };

            //In this case we assume the properties will fit in memory. So, turn on bulk loading, which will make autocompleting a lot faster
            returnObj.bulk = true;
            returnObj.async = true;

            //and, as everything is in memory, enable autoShowing the completions
            returnObj.autoShow = true;

            returnObj.persistent = "customProperties";//this will store the sparql results in the client-cache for a month.
            returnObj.get = function (token, callback) {
                //all we need from these parameters is the last one: the callback to pass the array of completions to
                var sparqlQuery = "PREFIX void: <http://rdfs.org/ns/void#>\n" +
                    "PREFIX ds: <http://bio2rdf.org/bio2rdf.dataset_vocabulary:>\n" +
                    "SELECT DISTINCT *\n" +
                    " { [] void:subset [\n" +
                    "   void:linkPredicate ?property;\n" +
                    "  ]\n" +
                    "} ORDER BY ?property";
                $.ajax({
                    data: {query: sparqlQuery},
                    url: YASQE.defaults.sparql.endpoint,
                    headers: {Accept: "text/csv"},//ask for csv. Simple, and uses less bandwidth
                    success: function (data) {
                        callback(getAutocompletionsArrayFromCsv(data));
                    }
                });
            };
            return returnObj;
        };
        //now register our new autocompleter
        YASQE.registerAutocompleter('customPropertyCompleter', customPropertyCompleter);


        //excellent, now do the same for the classes
        var customClassCompleter = function (yasqe) {
            var returnObj = {
                isValidCompletionPosition: function () {
                    return YASQE.Autocompleters.classes.isValidCompletionPosition(yasqe)
                },
                preProcessToken: function (token) {
                    return YASQE.Autocompleters.classes.preProcessToken(yasqe, token)
                },
                postProcessToken: function (token, suggestedString) {
                    return YASQE.Autocompleters.classes.postProcessToken(yasqe, token, suggestedString)
                }
            };
            returnObj.bulk = true;
            returnObj.async = true;
            returnObj.autoShow = true;
            returnObj.get = function (token, callback) {
                var sparqlQuery = "PREFIX void: <http://rdfs.org/ns/void#>\n" +
                    "PREFIX ds: <http://bio2rdf.org/bio2rdf.dataset_vocabulary:>\n" +
                    "SELECT *\n" +
                    "{ [] void:subset [\n" +
                    "       a ds:Dataset-Type-Count;\n" +
                    "       void:class ?type\n" +
                    "   ]\n" +
                    "} ORDER BY ?type";
                $.ajax({
                    data: {query: sparqlQuery},
                    url: YASQE.defaults.sparql.endpoint,
                    headers: {Accept: "text/csv"},//ask for csv. Simple, and uses less bandwidth
                    success: function (data) {
                        callback(getAutocompletionsArrayFromCsv(data));
                    }
                });
            };
            return returnObj;
        };
        YASQE.registerAutocompleter('customClassCompleter', customClassCompleter);

        //And, to make sure we don't use the other property and class autocompleters, overwrite the default enabled completers
        YASQE.defaults.autocompleters = ['customClassCompleter', 'customPropertyCompleter'];


        //finally, initialize YASQE
        var yasqe = YASQE(document.getElementById("yasqe"));
    }


    render() {

        return (
            <div>
                <div id="yasqe"></div>
            </div>
        );
    }
}

export default Yasqe;
