import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-main-body',
    standalone: true,
    imports: [NgFor, FormsModule, NgIf],
    templateUrl: './main-body.component.html',
    styleUrl: './main-body.component.css',
})
export class MainBodyComponent implements OnInit {
    data: any[] = [];
    filteredData: any[] = [];
    categories: string[] = [
        'All',
        'Restaurant',
        'Music',
        'Shopping',
        'Ride',
        'E-Commerce',
    ];
    selectedCategory: string = 'All';

    searchTerm: string = '';
    sortOrder: string = 'newest';

    page: number = 1; // Current page
    itemsPerPage: number = 16; // Show 16 items on first render

    constructor(private homeService: HomeService) {}

    ngOnInit() {
        this.homeService.getData().subscribe((response) => {
            this.data = response.data;
            this.filteredData = [...this.data]; // Initialize with full data
        });
    }

    filterData() {
        this.filteredData =
            this.selectedCategory === 'All'
                ? [...this.data.slice(0, 16)]
                : this.data.filter(
                      (item) => item.category === this.selectedCategory
                  );

        this.page = 1; // Reset to first page when filtering
    }

    get totalPages(): number {
        return Math.ceil(this.data.length / this.itemsPerPage);
    }

    get paginatedItems() {
        const startIndex = (this.page - 1) * this.itemsPerPage;
        return this.filteredData.slice(
            startIndex,
            startIndex + this.itemsPerPage
        );
    }

    changePage(newPage: number) {
        if (newPage >= 1 && newPage <= this.totalPages) {
            this.page = newPage;
            this.itemsPerPage = 16; // After first page, limit to 12 items per page
        }
        // console.log(this.filteredData);
    }

    getPageNumbers(): number[] {
        const pages = [];
        if (this.totalPages <= 5) {
            // Show all pages if total pages are 5 or less
            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            // Show middle range of pages dynamically
            let startPage = Math.max(2, this.page - 1);
            let endPage = Math.min(this.totalPages - 1, this.page + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            // Always show last page
            pages.push(this.totalPages);
        }
        return pages;
    }
}
