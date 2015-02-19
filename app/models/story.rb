class Story < ActiveRecord::Base

  def get_lines
    story_words = content.split
    story_lines = []
    while story_words.length > 0
      line = ""
      while line.length < 15 && story_words.length > 0
        line += story_words.shift
        line += " "
      end
      story_lines << line
    end
    story_lines
  end

end
