var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'BujhrGahc98VjRSZGaLYReLLXXEJIbYe';

var App = React.createClass({
    displayName: 'App',


    getInitialState: function () {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function (searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText, function (gif) {
            console.log(gif);
            this.setState({
                loading: false,
                gif: gif,
                searchingText: searchingText
            });
        }.bind(this));
    },

    httpGet: function (url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.status === 200) {
                    resolve(JSON.parse(this.response));
                } else {
                    reject(new Error(this.statusText));
                }
            };
            xhr.onerror = function () {
                reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
            };
            xhr.open('GET', url);
            xhr.send();
        });
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
    getGif: function (searchingText, callback) {
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        //var xhr = new XMLHttpRequest();

        this.httpGet(url).then(responseJSON => {
            let data = responseJSON.data;
            return {
                url: data.fixed_width_downsampled_url,
                sourceUrl: data.url
            };
        }).then(callback).catch(() => {
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

    render: function () {
        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return React.createElement(
            'div',
            { style: styles },
            React.createElement(
                'h1',
                null,
                'Wyszukiwarka GIFow!'
            ),
            React.createElement(
                'p',
                null,
                'Znajd\u017A gifa na ',
                React.createElement(
                    'a',
                    { href: 'http://giphy.com' },
                    'giphy'
                ),
                '. Naciskaj enter, aby pobra\u0107 kolejne gify.'
            ),
            React.createElement(Search, {
                onSearch: this.handleSearch
            }),
            React.createElement(Gif, {
                loading: this.state.loading,
                url: this.state.gif.url,
                sourceUrl: this.state.gif.sourceUrl
            })
        );
    }
});
var GIPHY_LOADING_URL = 'http://www.ifmo.ru/images/loader.gif';

var styles = {
	minHeight: '310px',
	margin: '0.5em'
};

var Gif = React.createClass({
	displayName: 'Gif',


	getUrl: function () {
		return this.props.sourceUrl || GIPHY_LOADING_URL;
	},

	render: function () {

		var url = this.props.loading ? GIPHY_LOADING_URL : this.props.url;

		return React.createElement(
			'div',
			{ style: styles },
			React.createElement(
				'a',
				{ href: this.getUrl(), title: 'view this on giphy', target: 'new' },
				React.createElement('img', { id: 'gif', src: url, style: { width: '100%', maxWidth: '350px' } })
			)
		);
	}
});
var Search = React.createClass({
  displayName: 'Search',


  getInitialState() {
    return {
      searchingText: ''
    };
  },

  handleChange: function (event) {
    var searchingText = event.target.value;
    this.setState({
      searchingText: searchingText
    });

    if (searchingText.length > 2) {
      this.props.onSearch(searchingText);
    }
  },

  handleKeyUp: function (event) {
    if (event.keyCode == 13) {
      this.props.onSearch(this.state.searchingText);
    }
  },

  render: function () {

    var styles = {
      fontSize: '1.5em',
      width: '90%',
      maxWidth: '350px'
    };

    return React.createElement('input', { type: 'text',
      onChange: this.handleChange,
      onKeyUp: this.handleKeyUp,
      placeholder: 'Tutaj wpisz wyszukiwan\u0105 fraz\u0119',
      style: styles,
      value: this.state.searchTerm
    });
  }

});
var app = React.createElement(App, null); //React.createElement(App);
ReactDOM.render(app, document.getElementById('app'));
