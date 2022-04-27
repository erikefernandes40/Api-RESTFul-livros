import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { yupCreateBookInput, yupUpdateBookAmountInput } from 'src/yup/books';
import { BookService } from './books.service';
import { CreateBookInput, UpdateBookAmountInput } from './dto/books';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/books')
  async createBook(@Body() input: CreateBookInput) {
    // Utiliza um schema yup para verificar o input
    const isValidInput = yupCreateBookInput.isValidSync(input);

    // Caso seja inválido, retorna erro 400
    if (!isValidInput) throw new BadRequestException('Seu input está inválido');

    return this.bookService.createBook(input);
  }

  @Get('/books')
  async getBooks() {
    // Busca e retorna todos os livros cadastrados
    return this.bookService.getBooks();
  }

  @Put('/books/amount/:id')
  async updateBookAmount(
    @Body() input: UpdateBookAmountInput,
    @Param() params,
  ) {
    // Utiliza um schema yup para verificar o input
    const isValidInput = yupUpdateBookAmountInput.isValidSync(input);

    // Caso seja inválido, retorna erro 400
    if (!isValidInput)
      throw new BadRequestException('O campo amount é requerido');

    return this.bookService.updateBookAmount(input.amount, params.id);
  }
}
