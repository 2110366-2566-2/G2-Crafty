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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { CreateReviewDto } from './dto/create-review'
import { FavoriteDto } from './dto/favorite.dto'
import { AuthGuard } from '../auth/guard/auth.guard'
import { UserEntity } from '../users/entities/user.entity'
import { SearchDto } from './dto/search.dto'
import { Roles } from '../auth/guard/roles.decorator'
import { PostEntity } from './dto/post.entity'

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

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Roles('ADMIN')
  @Get('all-admin')
  @ApiOkResponse({
    description: 'Get all posts for admin',
    type: PostEntity,
    isArray: true,
  })
  findAllAdmin(@Query() searchDto: SearchDto) {
    return this.postsService.findAllAdmin(searchDto.search)
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

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Roles('ADMIN')
  @Patch(':id/banning')
  @ApiOkResponse({
    description: 'banning a post',
    type: PostEntity,
  })
  banning(@Param('id') id: string) {
    return this.postsService.banning(id)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Roles('ADMIN')
  @Patch(':id/unbanning')
  @ApiOkResponse({
    description: 'Unbanning a post',
    type: PostEntity,
  })
  unbanning(@Param('id') id: string) {
    return this.postsService.unbanning(id)
  }
}
