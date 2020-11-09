import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Link from '@material-ui/core/Link'
import StarIcon from '@material-ui/icons/Star'
import StarEmptyIcon from '@material-ui/icons/StarBorder'

const useStyles = makeStyles((theme) => ({
  link: {
    cursor: 'pointer'
  },
  star: {
    color: 'yellow',
    marginRight: 2,
    cursor: 'pointer'
  }
}))

const StarredIcon = ({ isStarred, ...props }) => {
  const Star = isStarred ? StarIcon : StarEmptyIcon
  return <Star {...props} />
}

function RepositoryList ({
  repositories = [],
  onStarClick
}) {
  const classes = useStyles()
  return <List dense={true}>
    {repositories.map((repo, i) => {
      return <ListItem key={`repo-${i}`}>
        <StarredIcon
          isStarred={repo.starred}
          className={classes.star}
          onClick={() => onStarClick(i)}
        />
        <Link className={classes.link} target="_blank" rel="noopener" href={repo.html_url}>
          {repo.name}
        </Link>
      </ListItem>
    })}
  </List >
}

export default RepositoryList
