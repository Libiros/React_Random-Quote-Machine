class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      randomQuote: {}
    };
    this.getRandomQuote = this.getRandomQuote.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          quotes: result.quotes
        });
        this.getRandomQuote();
      });
  }

  getRandomQuote() {
    const randomQuote = this.state.quotes[
      Math.floor(Math.random() * this.state.quotes.length)
    ];
    this.setState({
      randomQuote: randomQuote
    });
  }

  render() {
    if (this.state.quotes.length) {
      const twitterLink = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
        '"' +
          this.state.randomQuote.quote +
          '" ' +
          this.state.randomQuote.author
      )}`;

      return (
        <div id="quote-box">
          <p>
            <span>
              <b id="author">{this.state.randomQuote.author}</b> said:
            </span>
            <q id="text">{this.state.randomQuote.quote}</q>
          </p>
          <div class="quote__bottom">
            <button id="new-quote" onClick={this.getRandomQuote}>
              Get new quote
            </button>
            <a
              href={twitterLink}
              id="tweet-quote"
              target="_top"
              title="Tweet this quote!"
            >
              Tweet it!
            </a>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
