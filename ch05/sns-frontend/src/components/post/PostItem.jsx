import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'

const PostItem = ({ post }) => {
   return (
      <Card style={{ margin: '20px 0' }}>
         <CardContent>
            <Typography variant="h6">@{post.username}</Typography>
            <Typography>{post.content}</Typography>
         </CardContent>
         <CardActions>
            <Button size="small" color="primary">
               좋아요
            </Button>
            <Button size="small" color="primary">
               댓글
            </Button>
         </CardActions>
      </Card>
   )
}

export default PostItem
