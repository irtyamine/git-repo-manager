import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../local-storage.service';
import { MockLocalStorage } from './mock/mock-local-storage';

describe('Service: LocalStorageService', () => {
  let lsService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ LocalStorageService ]
    });

    lsService = TestBed.get(LocalStorageService);

    spyOn(localStorage, 'getItem')
      .and.callFake(MockLocalStorage.getItem);

    spyOn(localStorage, 'setItem')
      .and.callFake(MockLocalStorage.setItem);

    spyOn(localStorage, 'removeItem')
      .and.callFake(MockLocalStorage.removeItem);

    spyOn(localStorage, 'clear')
      .and.callFake(MockLocalStorage.clear);

    lsService.clear();
  });

  describe('getItem(key: string)', () => {
    it('should return null from localStorage', () => {
      expect(lsService.getItem('test_data')).toBeNull();
    });
  });

  describe('setItem(key: string, value: string)', () => {
    it('should set item with \'test_data\' key to localStorage', () => {
      lsService.setItem('test_data', 'test');
      const result = lsService.getItem('test_data');

      expect(result)
        .toBe('test')
    });
  });

  describe('removeItem(key: string)', () => {
    it ('should remove item with \'test_data\' key from localStorage', () => {
      lsService.setItem('test_data', 'test');
      expect(lsService.getItem('test_data'))
        .toBe('test');

      lsService.removeItem('test_data');
      expect(lsService.getItem('test_data')).toBeNull();
    })
  });

  describe('clear()', () => {
    it ('should completely clear localStorage', () => {
      lsService.setItem('test_data_0', 'test_0');
      lsService.setItem('test_data_1', 'test_1');
      lsService.setItem('test_data_2', 'test_2');

      expect(lsService.getItem('test_data_0')).toBe('test_0');
      expect(lsService.getItem('test_data_1')).toBe('test_1');
      expect(lsService.getItem('test_data_2')).toBe('test_2');

      lsService.clear();
      expect(lsService.getItem('test_data_0')).toBeNull();
      expect(lsService.getItem('test_data_1')).toBeNull();
      expect(lsService.getItem('test_data_2')).toBeNull();
    });
  });
});
