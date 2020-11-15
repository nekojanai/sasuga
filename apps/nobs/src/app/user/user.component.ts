import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '@sasuga/api-interfaces';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import videojs from 'video.js';
import { GeneralSocket } from '../sockets/general.socket';
import { UserService } from './user.service';

@Component({
  selector: 'sasuga-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  ngUnsubscribe = new Subject();

  user: IUser;
  player: videojs.Player;
  isStreaming = false;

  get videoContainerElement() {
    return document.getElementById('videojs-container');
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private generalSocket: GeneralSocket
  ) { }

  ngOnInit(): void {
    this.initUser();
    this.generalSocket.fromEvent('newStream').pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((data:any) => {
      if (data.username === this.user?.name) {
        setTimeout(() => this.initUser(), 10000);
      }
    });
  }

  initUser() {
    this.route.params.pipe(
      takeUntil(this.ngUnsubscribe),
      map(params => params.name),
      switchMap(v => this.userService.getUser(v))
    ).subscribe((user: IUser) => {
      if (user && user.isActive) {
        this.user = user;
        this.isStreaming = user.isStreaming;
        if (this.isStreaming) {
          setTimeout(() => this.initPlayer(user.name),1);
        }
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

  initPlayer(username: string) {
    const src = {
      src: 'http://localhost/live/'+username+'/index.m3u8',
      type: 'application/x-mpegurl'
    };
    const options = {
      poster: '/assets/bg.gif',
      autoplay: true,
      muted: true,
      controls: true,
      sources: [
        {
          src: 'http://localhost/live/'+username+'/index.m3u8',
          type: 'application/x-mpegurl'
        }
      ],
      fluid: true
    };
    this.createOrGetVideoElement().classList.remove('hidden');
      this.player = videojs(this.createOrGetVideoElement(), options, () => {
        this.player.tech().on('retryplaylist', () => {
          this.createOrGetVideoElement().classList.add('hidden');
          this.player.dispose();
          this.player = undefined;
          this.initUser();
        });
      });
      this.player.on('error', () => {
        if (this.player.error().code === 4) {
            this.player.retryLock = setTimeout(() => {
                this.player.src(src);
                this.player.load();
            }, 5000);
        }
      });
      this.player.on('ended', () => {
        this.createOrGetVideoElement().classList.add('hidden');
        this.player.dispose();
        this.player = undefined;
        this.initUser();
      });
  }

  createOrGetVideoElement() {
    let elm = document.getElementById('videojs');
    if (elm) {
      return elm;
    } else {
      elm = document.createElement('video');
      elm.id = 'videojs';
      elm.classList.add('video-js','hidden');
      this.videoContainerElement.appendChild(elm);
      return elm;
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    if(this.player) {
      this.player.dispose();
    }
  }

}
