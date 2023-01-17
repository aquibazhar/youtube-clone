import { Pipe, PipeTransform } from '@angular/core';
import { VideoAuthor } from '../models/video-author';

@Pipe({
  name: 'searchCompare',
})
export class SearchComparePipe implements PipeTransform {
  transform(value: VideoAuthor, searchInput: string): boolean {
    if (
      value.video.title
        .toLowerCase()
        .includes(searchInput.trim().toLowerCase()) ||
      value.video.description
        .toLowerCase()
        .includes(searchInput.trim().toLowerCase()) ||
      value.author.fullName
        .toLowerCase()
        .includes(searchInput.trim().toLowerCase()) ||
      value.video.tags.includes(searchInput.trim().toLowerCase())
    ) {
      return true;
    }

    return false;
  }
}
