import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class homeComponent implements OnInit{

  slides = [
    {img: "assets/album/image1.jpg"},
    {img: "assets/album/image2.jpg"},
    {img: "assets/album/image3.jpg"},
    {img: "assets/album/image4.jpg"},
    {img: "assets/album/image5.jpg"},
    {img: "assets/album/image6.jpg"},
    {img: "assets/album/image7.jpg"},
    {img: "assets/album/image8.jpg"},
    {img: "assets/album/image9.jpg"},
    {img: "assets/album/image10.jpg"},
    {img: "assets/album/image11.jpg"},
    {img: "assets/album/image12.jpg"},
    {img: "assets/album/image13.jpg"},
  ];

  constructor(private authService: AuthService){

  }

  ngOnInit(){
  }

  
  slideConfig = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1775,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1375,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 975,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };

  reviews = [
    {
      title: 'Super restaurant',
      content: 'Le repas était excellent et le service impeccable. Nous reviendrons certainement !',
      author: '- Marie L.',
      ratings: [true, true, true, true, false]
    },
    {
      title: 'Belle expérience culinaire',
      content: 'Le chef a concocté un menu fabuleux, les vins étaient exceptionnels.',
      author: '- Thomas R.',
      ratings: [true, true, true, true, true]
    },
    {
      title: 'Excellent service',
      content: 'Le personnel était très sympathique et attentionné. Nous avons passé une soirée agréable.',
      author: '- Julie M.',
      ratings: [true, true, true, true, false]
    },
    {
      title: 'Très bon rapport qualité-prix',
      content: 'Les plats étaient excellents et les prix raisonnables. Nous avons apprécié notre dîner.',
      author: '- Pierre D.',
      ratings: [true, true, true, true, true]
      }
    ];
  
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e: any) {
    console.log('slick initialized');
  }
  
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  
  afterChange(e: any) {
    console.log('afterChange');
  }
  
  beforeChange(e: any) {
    console.log('beforeChange');
  }

  scrollPresentation(){
    const target = document.querySelector('#target');
    if(target){
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  logout(){
    console.log('deconnexion');
    this.authService.logOut();
  }

}
