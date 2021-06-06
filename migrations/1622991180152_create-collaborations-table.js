/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // membuat table collaborations
  pgm.createTable("collaborations", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    song_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    user_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
  });

  /*
      Menambahkan constraint UNIQUE, kombinasi dari kolom song_id dan user_id.
      Guna menghindari duplikasi data antara nilai keduanya.
    */
  pgm.addConstraint("collaborations", "unique_song_id_and_user_id", "UNIQUE(song_id, user_id)");

  // memberikan constraint foreign key pada kolom song_id dan user_id terhadap songs.id dan users.id
  pgm.addConstraint("collaborations", "fk_collaborations.song_id_songs.id", "FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE");
  pgm.addConstraint("collaborations", "fk_collaborations.user_id_users.id", "FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE");
};

exports.down = (pgm) => {
  // menghapus tabel collaborations
  pgm.dropTable("collaborations");
};
