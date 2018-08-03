var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'BujhrGahc98VjRSZGaLYReLLXXEJIbYe';

var App = React.createClass({

    getInitialState: function() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText, function(gif) {
            console.log(gif);
            this.setState({
                loading: false,
                gif: gif,
                searchingText: searchingText
            });
        }.bind(this));
    },

    httpGet: function(url) {
        return new Promise(
            
            function(resolve, reject) {
                const xhr = new XMLHttpRequest();
                xhr.onload = function() {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.response));
                    } else {
                        reject(new Error(this.statusText));
                    }
                }
                xhr.onerror = function() {
                    reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
                }
                xhr.open('GET', url);
                xhr.send();
            }
        );

    }, 
/*
    setUpGif: function() {
        console.log(responseJSON);
        let data = responseJSON.data;
        let gif = {
            url: data.fixed_width_downsampled_url,
            sourceUrl: data.url
        };
        callback(gif);
    },
*/
    getGif: function(searchingText, callback) {
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        //var xhr = new XMLHttpRequest();

        this.httpGet(url)
            .then((responseJSON) => {
                let data = responseJSON.data;
                return {
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
            })
            .then(callback)
            .catch(() => {
                console.log('Something went wrong with the promise');
            });

        
            /*
                var data = JSON.parse(xhr.responseText).data;
                var gif = {
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif);
            */
    },


    render: function() {
        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (<div style={styles}>
            <h1>Wyszukiwarka GIFow!</h1>
            <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
            <Search 
                onSearch={this.handleSearch}
            />
            <Gif 
                loading={this.state.loading}
                url={this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl}
            />
        </div>);
    }
});