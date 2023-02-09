export class Artist {
    id: number | undefined;
    name: string = '';
    description: string = '';
    imageUrl: string = '';
    contractSignedOn: Date = new Date();
    albums: number = 0;
    get isNew(): boolean {
      return this.id === undefined;
    }
  
    constructor(initializer?: any) {
      if (!initializer) return;
      if (initializer.id) this.id = initializer.id;
      if (initializer.name) this.name = initializer.name;
      if (initializer.description) this.description = initializer.description;
      if (initializer.imageUrl) this.imageUrl = initializer.imageUrl;
      if (initializer.contractSignedOn)
        this.contractSignedOn = new Date(initializer.contractSignedOn);
      if (initializer.albums) this.albums = initializer.albums;
    }
  }