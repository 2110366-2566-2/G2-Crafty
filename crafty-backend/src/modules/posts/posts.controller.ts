import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateReviewDto } from './dto/create-review'
import { FavoriteDto } from './dto/favorite.dto'
import { AuthGuard } from '../auth/guard/auth.guard'
import { UserEntity } from '../users/entities/user.entity'
import { SearchDto } from './dto/search.dto'

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':id/reviews')
  addReview(
    @Param('id') postId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.postsService.addReview(
      postId,
      createReviewDto.desc,
      createReviewDto.rate,
      createReviewDto.sender,
    )
  }

  @Get(':id/reviews')
  getReviews(@Param('id') postId: string) {
    return this.postsService.getReviews(postId)
  }

  @Post(':id/addfavorites')
  addFavorite(@Param('id') postId: string, @Body() favoriteDto: FavoriteDto) {
    return this.postsService.addFavorite(favoriteDto.userId, postId)
  }

  @Post(':id/unfavorites')
  unFavorite(@Param('id') postId: string, @Body() favoriteDto: FavoriteDto) {
    return this.postsService.unFavorite(favoriteDto.userId, postId)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    const user = new UserEntity(req.user)
    return this.postsService.create(user.id, createPostDto)
  }

  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.postsService.findAll(searchDto.search)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('me')
  findMyPost(@Request() req) {
    const user = new UserEntity(req.user)
    return this.postsService.findMyPost(user.id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id)
  }

  @Patch(':id/boosting')
  boosting(@Param('id') id: string) {
    return this.postsService.boosting(id)
  }

  @Patch(':id/unboosting')
  unboosting(@Param('id') id: string) {
    return this.postsService.unboosting(id)
  }
}
