<div align="center">
<h1>🎧 @maferland/spotify</h1>

<p>Fetch Spotify activity for social sharing purposes</p>
</div>

---

[![Netlify Status](https://api.netlify.com/api/v1/badges/a32962f4-a6eb-4218-9185-b0891596f9dd/deploy-status)](https://app.netlify.com/sites/maferland-spotify/deploys)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [How to use](#how-to-use)
- [What's the purpose ?](#whats-the-purpose-)
- [Author](#author)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How to use

```
netlify dev
```

## What's the purpose ?

This project is mostly a helper project (but mostly the code behing
[spotify.maferland.com](https://spotify.maferland.com)) for
[@maferand/spotify-react](https://www.github.com/maferland/spotify-react).

This project store authorization codes to make your spotify most recently
listened tracks publicly available. If you want to authorize please go
[here](https://spotify.maferland.com).

Then, you should be able to get your history like this (that's me!):

```
curl spotify.maferland.com/.netlify/functions/recently-played/12166023407
```

## Author

- [Marc-Antoine Ferland](https://maferland.com)

## LICENSE

[MIT](LICENSE)
