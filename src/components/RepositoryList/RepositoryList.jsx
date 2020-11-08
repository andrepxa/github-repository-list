import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Link from '@material-ui/core/Link'
import StarIcon from '@material-ui/icons/Star'
import StarEmptyIcon from '@material-ui/icons/StarBorder'

const useStyles = makeStyles((theme) => ({
  star: {
    color: 'yellow',
    marginRight: 2,
    cursor: 'pointer'
  }
}))

const StarredIcon = ({ isStarred, onClick }) => {
  const classes = useStyles()
  const Star = isStarred ? StarIcon : StarEmptyIcon
  return <Star className={classes.star} onClick={onClick} />
}

function RepositoryList ({
  repositories = [],
  onStarClick
}) {
  return <List dense={true}>
    {repositories.map(repo => {
      return <ListItem key={repo.id}>
        <StarredIcon
          isStarred={repo.starred}
          onClick={() => onStarClick(repo.name, repo.owner.login)}
        />
        <Link target="_blank" rel="noopener" href={repo.html_url}>
          {repo.name}
        </Link>
      </ListItem>
    })}
  </List >
}

export default RepositoryList
