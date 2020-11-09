import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Typography } from '@material-ui/core'

import {
  github,
  getRepositoryStar,
  starRepository,
  unstarRepository
} from './services/github'
import RepositoryList from './components/RepositoryList'

import './App.css'

const useStyles = makeStyles((theme) => ({
  text: {
    width: '300px',
    marginBottom: '10px'
  }
}))

function App () {
  const classes = useStyles()
  const [user, setUser] = useState('')
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')
  const [repositories, setRepositories] = useState([])

  const fetchRepositories = async () => {
    if (username) {
      let repos = await github.get(`/users/${username}/repos`)
        .then(({ data }) => data)

      if (!!user && !!token) {
        repos = await Promise.all(repos.map(({ name, html_url, owner }) =>
          getRepositoryStar({
            user,
            token,
            repoName: name,
            repoUser: owner.login
          })
            .then(_ => ({ name, html_url, owner, starred: true }))
            .catch(_ => ({ name, html_url, owner, starred: false }))
        ))
      }

      setRepositories(repos)
    }
  }

  const onStarClick = async repositoryIndex => {
    const { starred, owner, name } = repositories[repositoryIndex]
    const params = {
      user, token,
      repoName: name,
      repoUser: owner.login
    }

    if (starred) {
      await unstarRepository(params)
    } else {
      await starRepository(params)
    }

    const newRepositories = [...repositories]
    newRepositories[repositoryIndex].starred = !starred
    setRepositories(newRepositories)
  }

  return (
    <div className="App App-header">
      <Typography>Authentication for starring repositories</Typography>
      <TextField
        className={classes.text}
        value={user}
        onChange={e => setUser(e.target.value)}
        label="username"
        variant="outlined"
      />
      <TextField
        className={classes.text}
        value={token}
        type="password"
        onChange={e => setToken(e.target.value)}
        helperText="An username and personal access token with 'public_repo' scope are required to manage stars from repositories"
        label="token"
        variant="outlined"
      />
      <br />
      <TextField
        value={username}
        onChange={e => setUsername(e.target.value)}
        label="username"
        helperText="Username to find repos"
      />
      <Button type="submit" onClick={fetchRepositories}>
        list repositories
      </Button>
      <RepositoryList
        repositories={repositories}
        onStarClick={onStarClick}
      />
    </div>
  )
}

export default App
