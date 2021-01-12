exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("books")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("books").insert([
        {
          author: ["Gail Gibbons"],
          bookId: "PLS_c2v7gP0C",
          bookColor: "#fc8454",
          categories: ["Juvenile Nonfiction"],
          description:
            "Football is fun--let's play! Find all the basics in this lively guide. The markings on a football field What football players wear The positions, from quarterback to wide receiver The excitement of the kickoff The thrill of scoring a touchdown All these and more are included with a useful glossary at the end.",
          image:
            "http://books.google.com/books/content?id=PLS_c2v7gP0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          pageCount: 24,
          publishDate: "2000-08-22",
          searchInfo:
            "Football is fun--let&#39;s play! Find all the basics in this lively guide.",
          title: "My Football Book",
        },
        {
          author: ["Neil Gaiman", "Terry Pratchett"],
          bookId: "-o-2KpQlFNsC",
          bookColor: "#e45c14",
          categories: ["Fiction"],
          description:
            "____________________ COMING TO AMAZON PRIME ON 31ST MAY - STARRING DAVID TENNANT, MICHAEL SHEEN AND BENEDICT CUMBERBATCH 'Marvellously benign, ridiculously inventive and gloriously funny' Guardian ____________________ 'Armageddon only happens once, you know. They don't let you go around again until you get it right' According to The Nice and Accurate Prophecies of Agnes Nutter, Witch, Judgement Day is almost upon us and the world's going to end in a week . . . Now people have been predicting the end of the world almost from its very beginning, so it's only natural to be sceptical when a new date is set for Judgement Day. But what if, for once, the predictions are right, and the apocalypse really is due to arrive next Saturday, just after tea? You could spend the time left drowning your sorrows, giving away all your possessions in preparation for the rapture, or laughing it off as (hopefully) just another hoax. Or you could just try to do something about it. It's a predicament that Aziraphale, a somewhat fussy angel, and Crowley, a fast-living demon now finds themselves in. They've been living amongst Earth's mortals since The Beginning and, truth be told, have grown rather fond of the lifestyle and, in all honesty, are not actually looking forward to the coming Apocalypse. And then there's the small matter that someone appears to have misplaced the Antichrist . . .",
          image:
            "http://books.google.com/books/content?id=B7FL6zzN_FsC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
          pageCount: 416,
          publishDate: "2011-11-22",
          searchInfo: undefined,
          title: "Good Omens",
        },
      ]);
    });
};
